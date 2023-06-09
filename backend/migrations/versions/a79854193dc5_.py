"""empty message

Revision ID: a79854193dc5
Revises: 938e3ead801e
Create Date: 2023-05-05 18:12:29.905527

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'a79854193dc5'
down_revision = '938e3ead801e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('result', schema=None) as batch_op:
        batch_op.alter_column('meet_id',
               existing_type=mysql.INTEGER(),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('result', schema=None) as batch_op:
        batch_op.alter_column('meet_id',
               existing_type=mysql.INTEGER(),
               nullable=False)

    # ### end Alembic commands ###
