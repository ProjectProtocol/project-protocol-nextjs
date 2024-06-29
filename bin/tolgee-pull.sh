# Set environment variables
source .env.local

OUTPUT_DIR=$1

# login to tolgee platform
tolgee login $TOLGEE_ACCESS_TOKEN

# pull translation files to ./i18n folder
tolgee pull --path $OUTPUT_DIR --project-id 7020 --empty-dir