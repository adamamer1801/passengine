import { FaBullseye } from "react-icons/fa"

const defaultCharacterPool = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()<>,./?{}[]".split("")
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
const lowercase = "abcdefghijklmnopqrstuvwxyz".split("")
const numbers = "1234567890".split("")
const special = "!@#$%^&*()<>,./?{}[]".split("")

type createPasswordOptions = {
    uppercase: boolean,
    lowercase: boolean,
    special: boolean,
    numbers: boolean,
    length: number,
    includeCharacters: string,
    excludeCharacters: string
}

function createPassword(opts: createPasswordOptions) {
    let characterPool = defaultCharacterPool

    if (!opts.uppercase) {
        characterPool = characterPool.filter((l) => !uppercase.includes(l));
    }

    if (!opts.lowercase) {
        characterPool = characterPool.filter((l) => !lowercase.includes(l));
    }

    if (!opts.special) {
        characterPool = characterPool.filter((l) => !special.includes(l));
    }

    if (!opts.numbers) {
        characterPool = characterPool.filter((l) => !numbers.includes(l));
    }

    if (opts.excludeCharacters.length > 1) {
        characterPool = characterPool.filter((l) => !(opts.excludeCharacters.split("")).includes(l));
    }

    if (opts.includeCharacters.length > 1) {
        characterPool = characterPool.concat(removeDuplicates(opts.includeCharacters.split("")))
    }

    let password = ""

    if (characterPool.length == 0) {
        return "No characters"
    }

    for (let i = 0; i != opts.length; i++) {
        // super simple stuff
        password += characterPool[Math.floor(Math.random() * characterPool.length)]
    }

    return password;
}

function removeDuplicates(s: any[]) {
    return s.filter((e, i) => s.indexOf(e) === i);
}

export { createPassword }

