from django.urls import path
from base.views import course_views as views

urlpatterns = [
    path('', views.getCourses, name="courses"),
    path('<str:pk>/', views.getCourse, name="course"),
]