"""empty message

Revision ID: d3c5a0fd7510
Revises: 80c931665f69
Create Date: 2023-05-03 14:51:28.318603

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd3c5a0fd7510'
down_revision = '80c931665f69'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('result', schema=None) as batch_op:
        batch_op.add_column(sa.Column('distance', sa.Integer(), nullable=False))
        batch_op.add_column(sa.Column('stroke', sa.Integer(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('result', schema=None) as batch_op:
        batch_op.drop_column('stroke')
        batch_op.drop_column('distance')

    # ### end Alembic commands ###