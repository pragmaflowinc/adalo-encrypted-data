import { Text, View } from "react-native";
import React from "react";
import { CreateKeyPair, SHARED_PRIVATE_KEY } from "../../utils/crypto";
import { Button } from '@protonapp/react-native-material-ui';
import { EncryptedCreateKeyButtonProps } from "./generated";

function CreateSharedKeyButton({ onKeysGenerated,
  styles: { title: titleStyles },
  title = "",
  icon,
  backgroundColor,}: EncryptedCreateKeyButtonProps) {
  const createPrivateKey = () => {
		if (onKeysGenerated) { 

			const { myPublicKey: publicKey, myPrivateKey: privateKey } = CreateKeyPair()
      onKeysGenerated(publicKey, privateKey)
		}
	} 
  return (
    <View>
      <Button
       icon={icon}
      text={title}
      style={{
        container: {
          backgroundColor: backgroundColor,
					alignSelf: 'stretch'
        },
        text: {
          color: titleStyles.color,
          fontFamily: titleStyles.fontFamily,
          fontSize: titleStyles.fontSize,
          fontWeight: titleStyles.fontWeight
        }
      }} 
      onPress={() => {
        createPrivateKey()
      }} />
    </View>
  )
}

export default CreateSharedKeyButton
