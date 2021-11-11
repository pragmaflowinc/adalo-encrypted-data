import React, { useEffect, useState } from 'react'
import { TextInput, Text, View, StyleSheet } from 'react-native'
import { SharedEncryptedTextProps } from './generated'
import { decrypt, encrypt } from '../../utils/crypto';


const SharedEncryptedText = ({ color, text, theirPublicKey, myPrivateKey, editor }: SharedEncryptedTextProps) => {
	const [decryptedValue, setDescryptedValue] = useState('')

	useEffect(() => {
		if (theirPublicKey && text && myPrivateKey) {
			(async () => {
				const textValue = decrypt(theirPublicKey, myPrivateKey, text)
				if (textValue) {
					setDescryptedValue(textValue)
				}
			})()
		}
	}, [theirPublicKey, text, myPrivateKey])

	return(
		<View style={styles.wrapper}>
			<Text style={{ color }}>{editor ? "Decrypted Text" : decryptedValue}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		display: 'flex',
	}
})

export default SharedEncryptedText
