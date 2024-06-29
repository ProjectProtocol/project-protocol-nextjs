# Set environment variables
if [ -z "${CI}" ]; then
    echo "Tolgee-pull running locally"
    source .env.local
else
    echo "Tolgee-Pull running in CI"
fi

OUTPUT_DIR=$1

# login to tolgee platform
tolgee login $TOLGEE_ACCESS_TOKEN

# pull translation files to ./i18n folder
tolgee pull --path ${OUTPUT_DIR:-tmp/tolgee-files} --project-id 7020 --empty-dir
