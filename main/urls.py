from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='home'),
    path('about/', views.about, name='about'),
    path('news/', views.news, name='news'),
    path('news/delete/<int:news_id>/', views.delete_news, name='delete_news'),
    path('add_news/', views.add_news, name='add_news'),
    path('news/edit/<int:news_id>/', views.edit_news, name='edit_news'),
    path('contacts/', views.contacts, name='contacts'),
]
