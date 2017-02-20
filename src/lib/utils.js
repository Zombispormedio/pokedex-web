import styles from '../theme/styles.scss';
import randomColor from 'random-material-color'

export function findById(items, id) {
    return items.find((item) => item.id == id)
}

export function AvatarData({ name, sprite }) {
    let avatarData = {
        style: {
            backgroundColor: 'transparent'
        }
    }

    if (sprite != null && sprite.length > 0) {
        avatarData.className = styles.itemAvatarSprite;
        avatarData.image = sprite
    } else {
        avatarData.title = name
        avatarData.className = styles.itemAvatar;
        avatarData.style.backgroundColor = randomColor.getColor({
            text: name
        })
    }

    return avatarData
}

const colorPokemonType = {
    "Bicho": "#739e45",
    "Dragón": "#ef6f5b",
    "Hada": "#fcbae8",
    "Fuego": "#fb7b31",
    "Fantasma": "#7b64a1",
    "Tierra": "#aa9748",
    "Normal": "#a4acaf",
    "Psíquico": "#f169b8",
    "Acero": "#9fb7b8",
    "Siniestro": "#757575",
    "Eléctrico": "#edd447",
    "Lucha": "#d3672e",
    "Volador": "#46c7ed",
    "Planta": "#9cca58",
    "Hielo": "#57c4e5",
    "Veneno": "#b881c7",
    "Roca": "#a28b2d",
    "Agua": "#4993c2"

}

export function colorOfPokemonType(name) {
    return colorPokemonType[name]
}

export function generateValidationMessage(errors) {
  if (errors.name != void 0) {
    return `Nombre ${errors.name[0]}`
  } else if (errors.description != void 0) {
    return `Descripción ${errors.description[0]}`
  } else if (errors.type_id) {
    return `Tipo 1 ${errors.name[0]}`
  } else if (errors.type) {
    return `Tipos ${errors.name[0]}`
  }
}

export function diff(model, data, keys){
    return keys.reduce((memo, key)=>memo || model[key] != data[key], false)
}
