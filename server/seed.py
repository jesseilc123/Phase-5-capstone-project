from random import randint, choice as rc

from faker import Faker

from app import app
from config import db
from models.models import *
from data.pikmin_data import *
from data.map_data import *
from data.character_data import *
from data.enemy_data import *
from data.treasure_data import *

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Beginning Seed...")
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
        print("    Seeding Users...")
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
        print("    Seeding Posts...")
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
        print("    Seeding Replies...")
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
        print("    Seeding Pikmin...")
        pikmin_list = [red, yellow, blue, white, purple, rock, winged, ice, glow]
        for i in pikmin_list:
            db.session.add(i)
            db.session.commit()

            pikmins.append(i)

        # Characters 
        chars = []
        print("    Seeding Characters...")
        char_list = [olimar, louie, oatchi, shepherd, collin, russ, dingo, yonny, bernard]
        for i in char_list:
            db.session.add(i)
            db.session.commit()

            chars.append(i)
        
        # Maps
        maps = []
        print("    Seeding Maps...")
        map_list = [sun_speckled_terrace, blossoming_arcadia, serene_shores, heros_hideaway, giants_hearth, primordial_thicket]
        for i in map_list:
            db.session.add(i)
            db.session.commit()

            maps.append(i)

        # Enemies 
        enemies = []
        print("    Seeding Enemies...")
        enemy_list = [empress_bulblax, emperor_bulblax, sovereign_bulblax, horned_cannon_beetle, arctic_cannon_beetle, man_at_legs, groovy_long_legs, snowfake_fluttertail, giant_breadbug, gildemander, mammoth_snootwhacker, foolix, burrowing_snagret, puffstool, toxstool, porquillion, puffy_blowhog, masterhop, bug_eyed_crawmad, crusted_rumpup, bloomcap_bloyster, waterwraith, smoky_progg, ancient_sirehound]
        for i in enemy_list:
            db.session.add(i)
            db.session.commit()

            enemies.append(i)

        # Treasures
        treasures = []
        print("    Seeding Treasures...")
        treasure_list = [beckoning_mannequin, buddy_display, giants_fossil, lamp_of_inspiration, persistence_machine, crunchy_deluge, delectable_bouquet, portable_sunset, tremendous_sniffer, zest_bomb, birdy_bed, golden_vaulting_table, princess_pearl, sticky_jewel, unbreakable_promise, aspiration_ritual_ball, divine_balloon, faux_fishy, priceless_bird, sweat_soaked_blue_bird, unfloatable_boat]
        for i in treasure_list:
            db.session.add(i)
            db.session.commit()

            treasures.append(i)
        
        print("Seed complete!")