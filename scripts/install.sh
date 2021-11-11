yarn add react-native-get-random-values

cat <<EOF > /tmp/adalo-app-sed
/import React from 'react'/a\\
import 'react-native-get-random-values';\\
EOF

sed -i.bak "$(cat /tmp/adalo-app-sed)" App.js