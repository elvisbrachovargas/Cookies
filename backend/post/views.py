import json
from uuid import UUID

from django.http import JsonResponse
from django.utils.dateparse import parse_datetime
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

from .models import ConsentRecord


@csrf_exempt
@require_POST
def record_consent(request):
	try:
		payload = json.loads(request.body)
		consent_id = UUID(str(payload['consent_id']))
		decided_at = parse_datetime(str(payload['decided_at']))
		preferences = payload['preferences']
		policy_version = str(payload['policy_version'])
		policy_url = str(payload['policy_url'])
	except (KeyError, TypeError, ValueError, json.JSONDecodeError):
		return JsonResponse({'detail': 'Invalid consent payload.'}, status=400)

	if decided_at is None or not isinstance(preferences, dict):
		return JsonResponse({'detail': 'Invalid consent payload.'}, status=400)

	consent, created = ConsentRecord.objects.update_or_create(
		consent_id=consent_id,
		defaults={
			'essential': True,
			'analytics': bool(preferences.get('analytics', False)),
			'marketing': bool(preferences.get('marketing', False)),
			'decided_at': decided_at,
			'policy_version': policy_version,
			'policy_url': policy_url,
			'source': str(payload.get('source', 'cookie-banner'))[:64],
			'user_agent': request.META.get('HTTP_USER_AGENT', ''),
			'ip_address': request.META.get('REMOTE_ADDR'),
		},
	)

	return JsonResponse(
		{'consent_id': str(consent.consent_id), 'created': created},
		status=201 if created else 200,
	)
