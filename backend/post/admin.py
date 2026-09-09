from django.contrib import admin

from .models import ConsentRecord


@admin.register(ConsentRecord)
class ConsentRecordAdmin(admin.ModelAdmin):
	list_display = ('consent_id', 'analytics', 'marketing', 'decided_at', 'received_at')
	list_filter = ('analytics', 'marketing', 'policy_version')
	search_fields = ('consent_id', 'user_agent')
