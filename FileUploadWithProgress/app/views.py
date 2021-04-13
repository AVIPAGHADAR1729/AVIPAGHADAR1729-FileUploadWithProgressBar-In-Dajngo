from django.shortcuts import render

from app.forms import FileUploadFormByMe
from django.http import JsonResponse
# Create your views here.
def home(request):
	
	form = FileUploadFormByMe(request.POST or None,request.FILES or None)

	if request.is_ajax():
		if form.is_valid():
			form.save()
			return JsonResponse({'OK':'Success...'})




	return render(request, 'app/home.html',{'form':form})