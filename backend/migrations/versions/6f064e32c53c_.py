"""empty message

Revision ID: 6f064e32c53c
Revises: bdf5c386a32d
Create Date: 2023-04-27 11:31:47.159629

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6f064e32c53c'
down_revision = 'bdf5c386a32d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('family',
    sa.Column('relationship_id', sa.Integer(), nullable=False),
    sa.Column('family_id', sa.Integer(), nullable=False),
    sa.Column('parent_id', sa.Integer(), nullable=True),
    sa.Column('swimmer_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['parent_id'], ['parent.id'], ),
    sa.ForeignKeyConstraint(['swimmer_id'], ['swimmer.id'], ),
    sa.PrimaryKeyConstraint('relationship_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('family')
    # ### end Alembic commands ###