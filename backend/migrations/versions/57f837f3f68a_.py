"""empty message

Revision ID: 57f837f3f68a
Revises: 6f064e32c53c
Create Date: 2023-04-27 11:39:46.959445

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '57f837f3f68a'
down_revision = '6f064e32c53c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('family',
    sa.Column('relationship_id', sa.Integer(), nullable=False),
    sa.Column('family_id', sa.Integer(), nullable=False),
    sa.Column('parent_id', sa.Integer(), nullable=True),
    sa.Column('swimmer_id', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('relationship_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('family')
    # ### end Alembic commands ###