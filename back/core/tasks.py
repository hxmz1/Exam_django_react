from celery import shared_task
from django.core.mail import send_mail

@shared_task
def send_post_created_email(user_email, post_title):
    send_mail(
        'Nouveau post créé',
        f'Le post "{post_title}" a été créé avec succès.',
        'admin@example.com',
        [user_email],
    )
