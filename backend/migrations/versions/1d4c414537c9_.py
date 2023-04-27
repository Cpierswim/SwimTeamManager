"""empty message

Revision ID: 1d4c414537c9
Revises: 5bdc2ef04060
Create Date: 2023-04-26 21:11:42.842551

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '1d4c414537c9'
down_revision = '5bdc2ef04060'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('meet', schema=None) as batch_op:
        batch_op.drop_column('gender')

    with op.batch_alter_table('meet_event', schema=None) as batch_op:
        batch_op.add_column(sa.Column('gender', sa.String(length=1), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('meet_event', schema=None) as batch_op:
        batch_op.drop_column('gender')

    with op.batch_alter_table('meet', schema=None) as batch_op:
        batch_op.add_column(sa.Column('gender', mysql.VARCHAR(length=1), nullable=False))

    # ### end Alembic commands ###
