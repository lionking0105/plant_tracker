# Generated by Django 5.0.3 on 2024-04-24 12:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tracker', '0013_alter_location_unique_together_and_more'),
    ]

    operations = [
        migrations.RemoveConstraint(
            model_name='location',
            name='unique_by_user',
        ),
        migrations.AlterUniqueTogether(
            name='area',
            unique_together=set(),
        ),
        migrations.AlterUniqueTogether(
            name='plant',
            unique_together=set(),
        ),
    ]
