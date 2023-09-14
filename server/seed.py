from random import randint, choice as rc

from faker import Faker

from app import app
from config import db
from models.models import *

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
        # Pikmin
        red = Pikmin(name="Red Pikmin", resistance="Fire", attack="15", speed="Average", throw="Average", carry="1", description="Red Pikmin are the first variety of Pikmin identified in each Pikmin game. Aside from their color, the distinguishing feature of Red Pikmin is their pointed noses. These Pikmin possess an immunity to fire, making them useful for fighting Fiery Bulblax and Fiery Blowhog and passing by or destroying fire geysers. They spend nights in the Red Onion. Of the three Pikmin types in Pikmin, they have the most attack strength because of their thorn-like pointed noses. Red Pikmin can break down dirt walls faster than other Pikmin thanks to their higher attack power. A Red Pikmin is naturally stronger than a Rock Pikmin, but if a Rock Pikmin is thrown at a target, it deals more damage. In all games, they are found on Day 1, which has no time limit in any of the four Pikmin games.")

        yellow = Pikmin(name="Yellow Pikmin", resistance="Electricity", attack="10", speed="Average", throw="High", carry="1", description="Yellow Pikmin are the second type of Pikmin discovered in Pikmin, the fourth in Pikmin 2, and the third in Pikmin 3, although they also appear at the very beginning during Charlie's tutorial. These Pikmin have what appear to be very large ears; the means by which they are primarily identifiable. It is not known, however, whether or not this actually aids to their hearing. They also appear to prefer elevated habitats, such as trees. In all three games, the Yellow Pikmin are the second lightest Pikmin type and can be thrown higher than other Pikmin. This is an ability which is needed to retrieve certain elevated objects. The abilities of Yellow Pikmin vary more in the series than any other member of the species. Yellow Pikmin are the only Pikmin able to wield bomb rocks in Pikmin. In Pikmin 3, Yellow Pikmin can dig the fastest. In Super Smash Bros Brawl, Yellow Pikmin can deal electrical damage to enemies.")

        blue = Pikmin(name="Blue Pikmin", resistance="Water", attack="10", speed="Average", throw="Average", carry="1", description="Blue Pikmin, as their name implies, are a blue species of Pikmin. Besides coloration, these Pikmin are distinguishable from other Pikmin species by their mouths, a trait seen in no other Pikmin species. These mouths are used to take in water, which filters oxygen through the gills located on their cheeks. This gives them the astonishing ability to live their lives completely underwater. Producing more of them can be easily done by dragging nutrients or animal carcasses, carried by Blue Pikmin, to the Onion or by throwing other species into a Lapis Lazuli Candypop Bud.")

        white = Pikmin(name="White Pikmin", resistance="Poison", attack="5", speed="Fast", throw="Average", carry="1", description="White Pikmin are a troglobitic species of Pikmin that were introduced in Pikmin 2 and make another appearance in Pikmin 3. They are the third type of Pikmin found in Pikmin 2 and are produced through Ivory Candypop Buds, the first of which are found in the White Flower Garden. They are distinguished by their red eyes, pure color, and small stature. White pikmin deal damage when an enemy consumes them. The damage varies between enemy species. White Pikmin also have the fastest move speed out of any pikmin making them great at carrying treasure. In Pikmin 4, you are able to propagate them after you defeat the trail of the White Sage.")

        purple = Pikmin(name="Purple Pikmin", resistance="Being Blown / Inhaled", attack="15", speed="Slow", throw="Low", carry="10", description="Purple Pikmin are a troglobitic species of Pikmin found in Pikmin 2, Pikmin 3, and Pikmin 4.They are first found in the Emergence Cave. They have six hairs, used as feelers, protruding from their heads. These hairs are actually found in nature - plants like the Venus Flytrap use them. They are called trichomes, and are sensitive and tough hairs that plants use to detect their surroundings, as well as defend themselves from attempts at consumption. These Pikmin are very strong due to their weight. They are specifically required to obtain a number of treasures, two of which are needed to gain access to new areas, making them necessary to complete Pikmin 2. While it is possible to clear the debt in the first area without a Purple-Pikmin specific treasure, this takes a substantial amount of time to finish, as eventually the only form of income that remains are enemy corpses. Purple Pikmin share a number of similarities with White Pikmin. They can only be obtained via certain Violet Candypop Buds and have magenta flowers rather than white. In Pikmin 4 however, ou are able to propagate them after you defeat the trail of the White Sage. Purple Pikmin are the heaviest, slowest Pikmin species known, but are also the strongest.")

        rock = Pikmin(name="Rock Pikmin", resistance="Blunt Force", attack="20", speed="Average", throw="Average", carry="1", description="Rock Pikmin, also known as Gray Pikmin, are a species of Pikmin featured in Pikmin 3 and 4. They resemble small polished rocks with Pikmin eyes and limbs. Rock pikmin can break crystal walls and crystal rocks. They cannot be squished/trampled by enemies or impaled making them excellent fighters. Also, just like the Winged PikminWinged Pikmin, they have lavender colored flowers. The main part of their body seems to be a gray texture of graphite that reflects light, while the 'skin' on their arms and legs appears to be smooth and of a lighter shade of gray. When Rock Pikmin are dismissed, their sprouts glow gray. Their ghosts are also shaped like small gray rocks with eyes. Just like all other types of Pikmin in Pikmin 3 and 4, Rock Pikmin share an Onion and are reproduced through collecting nutrients from Pellets and corpses of dead foes. Rock Pikmin are the second type of Pikmin Alph discovers in Pikmin 3, the first being Red Pikmin. ")

        winged = Pikmin(name="Winged Pikmin", resistance="Ground Hazards (If Airborne)", attack="5", speed="Average", throw="Average", carry="1", description="As their name implies, Winged Pikmin are capable of flight, and are naturally airborne. They can carry items above the ground and can cut through entire areas to get fruits or spoils back to base quickly. Winged Pikmin are small and fast, allowing them to keep up with the captains at a steady pace. Due to their constant airborne status, they can follow captains even if they're walking in an area inaccessible to most Pikmin types, such as a small pond or other body of water. Because these Pikmin can fly, they home in on targets when thrown as to not miss. This is extremely useful when battling a highly-mobile creature. However, there are drawbacks to this. Because they fly and home in on their target, they have trouble flattening an enemy (such as a Dwarf Red Bulborb) by landing on its back. The time they need to home in on the enemy can also be liability, especially if the enemy is attacking or if an obstacle needs to be destroyed quickly. Winged Pikmin tie White Pikmin in terms of attack power, and are very weak, with an Attack Strength of a mere 5, half of an average Pikmin's damage. It is also worth noting that Winged Pikmin do not deal more damage against airborne enemies, which is a common belief, considering the fact that there is a Data File that states that 'Winged Pikmin are aces in aerial combat', something easily misperceived. Winged Pikmin also almost never touch the ground. Exceptions to this rule are when winged Pikmin hide, fall down (from being shaken off of a large creature), are planted in the ground, help other terrestrial Pikmin carry objects (or carry certain other objects by themselves), while pushing bags or boxes, and while on lily pads.")

        ice = Pikmin(name="Ice Pikmin", resistance="Ice", attack="10", speed="Average", throw="Average", carry="1", description="Ice Pikmin, as seen in Pikmin 4, this type of Pikmin can freeze enemies. When enough ice pikmin make contact with a body of water, it will freeze, allowing the player character to traverse through it with ease. Despite being able to float on bodies of water, they are still damaged by water hazards. They are pale cyan with yellow flowers, but otherwise share a resemblance with Rock Pikmin. Ice Pikmin are first found in the Last-Frost Cave. They are the most recommended Pikmin in the game, being recommended in every area except Giant’s Hearth")

        glow = Pikmin(name="Glow Pikmin", resistance="All (except mud, and gloom)", attack="5", speed="Average", throw="Average", carry="1", description="Glow Pikmin propagate more of themselves by bringing Glow Pellets to a Lumiknoll or Tricknoll. Glow Pellet piles can be found laying about in night expeditions, and some will drop from defeated foes during such missions. Similar to Winged Pikmin, Glow Pikmin can fly, though this flight is strictly limited to attacking aerial foes. Glow Pikmin have resistance to every single kind of elemental hazard. They are still vulnerable to all manner of physical hazard, including but not limited to stabbing, crushing, or being eaten. When the player is leading a group of Glow Pikmin, the charge command can be charged by pressing 'x' in order to coalesce the Glow Pikmin into a bright green orb referred to as a 'glowmob'. This glowmob can be released to launch a huge burst of light, stunning all enemies caught within its radius and leaving them vulnerable to the swarming Glow Pikmin. The ability to charge a glowmob will go into a brief cooldown after being used. Glow Pikmin have the ability to instantly warp to the player or Oatchi's location, depending on which character is being actively controlled. They will do so whenever they finish a task, or when the player switches control. Newly-spawned Glow Pikmin will also teleport themselves to the active character. Glow Pikmin will automatically bloom from leaf to bud to flower over time, and do not lose their flowers when damaged by enemies. Glow Pikmin do not 'die' in the same sense as other Pikmin do, turning into photons that travel back to the Lumiknoll when they suffer critical damage.")
        
