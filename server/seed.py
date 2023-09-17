from random import randint, choice as rc

from faker import Faker

from app import app
from config import db
from models.models import *
from data.pikmin_data import *
from data.map_data import *
from data.character_data import *

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        User.query.delete()
        Reply.query.delete()
        Post.query.delete()

        Character.query.delete()
        Enemy.query.delete()
        Map.query.delete()
        Pikmin.query.delete()
        Treasure.query.delete()

        # Forums
        users = []
        for i in range(30):
            fake_user = fake.unique.first_name()
            user = User(
                username = fake_user,
                email = f"{fake_user}@gmail.com"
            )
            user.password_hash = user.username

            db.session.add(user)
            db.session.commit()

            users.append(user)

        posts = []
        cat = ["Spoilers", "Memes", "Info", "General", "Game"]

        for i in range(30):
            user = rc(users)
            post = Post( 
                title = fake.sentence()[:-1].title(),
                body = fake.paragraph(nb_sentences=100),
                category = rc(cat),
                user_id = user.id
            )

            db.session.add(post)
            db.session.commit()

            posts.append(post)

        replies = []
        for i in range(30):
            user = rc(users)
            post = rc(posts)
            reply = Reply(
                content = fake.sentence(),
                user_id = user.id,
                post_id = post.id
            )

            db.session.add(reply)
            db.session.commit()

            replies.append(reply)

        # Guide
        # Pikmins
        pikmins = []
        pikmin_list = [red, yellow, blue, white, purple, rock, winged, ice, glow]
        for i in pikmin_list:
            db.session.add(i)
            db.session.commit()

            pikmins.append(i)

        # Characters 
        chars = []
        char_list = [olimar, louie, oatchi, shepherd, collin, russ, dingo, yonny, bernard]
        for i in char_list:
            db.session.add(i)
            db.session.commit()

            chars.append(i)
        
        # Maps
        maps = []
        map_list = [rescue_command_post, sun_speckled_terrace, blossoming_arcadia, serene_shores, heros_hideaway, giants_hearth, primordial_thicket]
        for i in map_list:
            db.session.add(i)
            db.session.commit()

            maps.append(i)

        

