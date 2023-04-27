"""empty message

Revision ID: ae1da9897c46
Revises: 57f837f3f68a
Create Date: 2023-04-27 12:06:16.402429

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ae1da9897c46'
down_revision = '57f837f3f68a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('group_coach',
    sa.Column('group_id', sa.Integer(), nullable=False),
    sa.Column('coach_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['coach_id'], ['coach.id'], ),
    sa.ForeignKeyConstraint(['group_id'], ['group.id'], ),
    sa.PrimaryKeyConstraint('group_id', 'coach_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('group_coach')
    # ### end Alembic commands ###
