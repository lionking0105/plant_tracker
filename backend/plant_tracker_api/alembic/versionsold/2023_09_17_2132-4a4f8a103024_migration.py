"""migration

Revision ID: 4a4f8a103024
Revises: d5d37b9d185a
Create Date: 2023-09-17 21:32:54.393587

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '4a4f8a103024'
down_revision: Union[str, None] = 'd5d37b9d185a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('scientific_name',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_scientific_name_id'), 'scientific_name', ['id'], unique=False)
    op.create_table('plant_scientific_name',
    sa.Column('plant_id', sa.UUID(), nullable=False),
    sa.Column('scientific_name_id', sa.UUID(), nullable=False),
    sa.ForeignKeyConstraint(['plant_id'], ['plant.id'], ),
    sa.ForeignKeyConstraint(['scientific_name_id'], ['scientific_name.id'], ),
    sa.PrimaryKeyConstraint('plant_id', 'scientific_name_id')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('plant_scientific_name')
    op.drop_index(op.f('ix_scientific_name_id'), table_name='scientific_name')
    op.drop_table('scientific_name')
    # ### end Alembic commands ###
