from django import forms
from app.models import FileByMe

class FileUploadFormByMe(forms.ModelForm):

	class Meta:
		model = FileByMe
		fields = ('file',)