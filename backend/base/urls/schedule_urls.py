from django.urls import path
from base.views import schedule_views as views

urlpatterns = [
    path('', views.getSchedules, name='schedules'),
    path('add/', views.addLectures, name='schedules-add'),
    path('myschedules/', views.getMySchedules, name='myschedules'),

    path('<str:pk>/', views.getScheduleById, name='user-schedule'),
    path('<str:pk>/attend/', views.updateScheduleToAttended, name='schedule-attended'),
]