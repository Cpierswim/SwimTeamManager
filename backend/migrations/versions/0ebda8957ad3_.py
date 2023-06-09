"""empty message

Revision ID: 0ebda8957ad3
Revises: d619d40a0d6d
Create Date: 2023-05-04 17:48:41.263391

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0ebda8957ad3'
down_revision = 'd619d40a0d6d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('meet_signup',
    sa.Column('swimmer_id', sa.Integer(), nullable=False),
    sa.Column('meet_id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('swimmer_id', 'meet_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('meet_signup')
    # ### end Alembic commands ###
