import React, { useEffect, useState } from 'react'
import { TextInput, Text, View, StyleSheet } from 'react-native'
import { EncryptedTextInputProps } from './generated'
import { decrypt, encrypt } from '../../utils/crypto';


const SharedEncryptedTextInput = ({ _height, color, text, myPublicKey, theirPublicKey, myPrivateKey, editor,borderColor, borderRadius, borderWidth, ...rest }: EncryptedTextInputProps) => {
	const [decryptedValue, setDescryptedValue] = useState('')

	useEffect(() => {
		if (!text?.value) {
				setDescryptedValue('')
		}
	}, [text?.value])

	const updateEncryptedText = (value: string) => {
		if (theirPublicKey && text && myPrivateKey && myPublicKey) {
			const theirEncryptedMessage = encrypt(theirPublicKey, myPrivateKey, value)
			if (theirEncryptedMessage) {
				text.onChange(theirEncryptedMessage)
			}
		}
	}

	return(
		<View style={styles.wrapper}>
			<TextInput onChangeText={value => { 
				setDescryptedValue(value)
				if (text) {
					updateEncryptedText(value)
				}
			}} value={decryptedValue} style={{ color, height: _height, borderColor, borderRadius, borderWidth, padding: 8 }} />
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		display: 'flex',
	}
})

export default SharedEncryptedTextInput
