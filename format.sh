format_file() {

    local path="$1"
    echo "Processing file: $path"
    need_format=$(git diff $path | sed -n '/----/,/----/p' | cut -c 2-)

    if [[ $need_format != "" ]]; then

        git diff $path | sed -n '/----/,/----/p' | cut -c 2- >tmp.liquid
        tail -n+2 $path >>tmp.liquid

        cp -f tmp.liquid $path
        rm tmp.liquid

        echo "Formatted file: $path"
    else
        echo "File: $path already in good format!"
    fi
}

if [[ $1 == "" ]]; then
    files=$(git status | grep modified | cut -c 14-)
    for file in $files; do
        format_file $file
    done
else
    for file in "$@"; do
        format_file $file
    done
fi
