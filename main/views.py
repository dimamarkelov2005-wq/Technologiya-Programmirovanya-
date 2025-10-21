from django.shortcuts import render, redirect, get_object_or_404
from .models import News
from .forms import NewsForm

def index(request):
    news = News.objects.order_by('-created_at')[:5]
    return render(request, 'main/index.html', {'news': news})

def about(request):
    return render(request, 'main/about.html')

def news(request):
    news = News.objects.order_by('-created_at')
    return render(request, 'main/news.html', {'news': news})

def add_news(request):
    if request.method == 'POST':
        form = NewsForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('news')
    else:
        form = NewsForm()
    return render(request, 'main/add_news.html', {'form': form})

def edit_news(request, news_id):
    news = get_object_or_404(News, id=news_id)
    if request.method == 'POST':
        form = NewsForm(request.POST, instance=news)
        if form.is_valid():
            form.save()
            return redirect('news')
    else:
        form = NewsForm(instance=news)
    return render(request, 'main/edit_news.html', {'form': form, 'news': news})

def delete_news(request, news_id):
    news = get_object_or_404(News, id=news_id)
    news.delete()
    return redirect('news')

def contacts(request):
    return render(request, 'main/contacts.html')
