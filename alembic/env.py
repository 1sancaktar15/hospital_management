from logging.config import fileConfig
import sys
import os

from sqlalchemy import engine_from_config
from sqlalchemy import pool

from alembic import context

# Proje kök dizinini sys.path'e ekle ki app modüllerini import edebilesin
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# Alembic Config objesi: alembic.ini dosyasındaki konfigürasyonları içerir
config = context.config

# Logging ayarlarını yükle
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Burada proje içindeki Base metadata’yı import et
from app.database import Base

# Alembic otomatik migration için hedef metadata
target_metadata = Base.metadata

def run_migrations_offline() -> None:
    """Offline modda migration."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online() -> None:
    """Online modda migration."""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection, 
            target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
