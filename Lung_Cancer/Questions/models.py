from django.db import models
from django.utils import timezone

# Create your models here.

class Question(models.Model):
    QUESTION_TYPES = [
        ('EMOJI', 'Emoji'),
        ('RATING', 'Rating'),
        ('YES_NO_MAYBE', 'Yes/No/Maybe'),
        ('TEXT', 'Text'),
    ]

    text = models.TextField()  
    question_type = models.CharField(max_length=20, choices=QUESTION_TYPES)  
    domain = models.CharField(max_length=255) 
    is_active = models.BooleanField(default=True)  
    created_at = models.DateTimeField(default=timezone.now)


    def __str__(self):
        return self.text
