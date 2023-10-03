"""Added icon columns

Revision ID: 16ebb5a28b00
Revises: 7887b93ac346
Create Date: 2023-10-03 12:15:40.382695

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '16ebb5a28b00'
down_revision = '7887b93ac346'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('pikmins', schema=None) as batch_op:
        batch_op.add_column(sa.Column('icon', sa.String()))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('pikmins', schema=None) as batch_op:
        batch_op.drop_column('icon')

    # ### end Alembic commands ###