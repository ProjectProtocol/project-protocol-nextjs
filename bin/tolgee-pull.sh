# Set environment variables
if [ -z "${VAR}" ]; then
    echo "Tolgee-Pull running in CI"
else
    echo "Tolgee-pull running locally"
    source .env.local
fi

OUTPUT_DIR=$1

# login to tolgee platform
tolgee login $TOLGEE_ACCESS_TOKEN

# pull translation files to ./i18n folder
tolgee pull --path ${OUTPUT_DIR:-tmp/tolgee-files} --project-id 7020 --empty-dir
