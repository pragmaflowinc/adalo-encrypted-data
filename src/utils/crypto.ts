import { box, randomBytes } from "tweetnacl";
import { decode as decodeUTF8, encode as encodeUTF8 } from "@stablelib/utf8";
import {
  decode as decodeBase64,
  encode as encodeBase64,
} from "@stablelib/base64";

export const SHARED_PRIVATE_KEY = "SHARED_PRIVATE_KEY"

export const stringToUint8Array = (content: string) =>
  Uint8Array.from(content.split(",").map((str) => parseInt(str)));

export const CreateKeyPair = () => {
  const { publicKey, secretKey } = box.keyPair()
  const myPublicKey = encodeBase64(publicKey)
  const myPrivateKey = encodeBase64(secretKey)
  return { myPublicKey, myPrivateKey }
}

export const encrypt = (theirPublicKey: string, myPrivateKey: string, message: string) => {
  const nonce = randomBytes(box.nonceLength)
  const messageArray = encodeUTF8(message)
  if (!myPrivateKey) { return ; } 
  // to make it easier on the no-code community, let's stuff the nonce into the message!
  const encryptedMessage = box(messageArray, nonce, decodeBase64(theirPublicKey), decodeBase64(myPrivateKey))
  const messageAndNonce = new Uint8Array(nonce.length + encryptedMessage.length)
  messageAndNonce.set(nonce)
  messageAndNonce.set(encryptedMessage, nonce.length)
  return encodeBase64(messageAndNonce)
}

export const decrypt = (theirPublicKey: string, myPrivateKey: string, encryptedMessageAndNonce: string) => {
  if (!myPrivateKey) { return ; }
  // revese the nonce stuffing
  try {
    const decode = decodeBase64(encryptedMessageAndNonce)
    const nonce = decode.slice(0, box.nonceLength)
    const message = decode.slice(box.nonceLength, encryptedMessageAndNonce.length)
    const decryptedMessage = box.open(message, nonce, decodeBase64(theirPublicKey), decodeBase64(myPrivateKey))
    if (decryptedMessage) {
      return decodeUTF8(decryptedMessage)
    }
  } catch {

  }
  return 
}