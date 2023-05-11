"""empty message

Revision ID: 7f30c93eb9e2
Revises: 7b6ade3a0ce9
Create Date: 2023-05-10 20:46:02.842541

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7f30c93eb9e2'
down_revision = '7b6ade3a0ce9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('group', schema=None) as batch_op:
        batch_op.add_column(sa.Column('start_time', sa.Time(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('group', schema=None) as batch_op:
        batch_op.drop_column('start_time')

    # ### end Alembic commands ###
