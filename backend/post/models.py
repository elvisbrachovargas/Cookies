from django.db import models


class ConsentRecord(models.Model):
	consent_id = models.UUIDField(unique=True, db_index=True)
	essential = models.BooleanField(default=True)
	analytics = models.BooleanField(default=False)
	marketing = models.BooleanField(default=False)
	decided_at = models.DateTimeField()
	policy_version = models.CharField(max_length=32)
	policy_url = models.URLField(max_length=500)
	source = models.CharField(max_length=64, default='cookie-banner')
	user_agent = models.TextField(blank=True)
	ip_address = models.GenericIPAddressField(null=True, blank=True)
	received_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		ordering = ('-received_at',)
