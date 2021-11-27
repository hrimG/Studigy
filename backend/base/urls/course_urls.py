from django.urls import path
from base.views import course_views as views

urlpatterns = [
    path('', views.getCourses, name="courses"),

    path('create/', views.createCourse, name="course-create"),
    path('upload/', views.uploadImage, name="image-upload"),

    path('<str:pk>/comments/', views.createCourseComment, name="create-comment"),
    path('<str:pk>/', views.getCourse, name="course"),

    path('update/<str:pk>/', views.updateCourse, name="course-update"),
    path('delete/<str:pk>/', views.deleteCourse, name="course-delete"),
]