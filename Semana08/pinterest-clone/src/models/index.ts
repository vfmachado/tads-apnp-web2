import { User } from './User';
import { Tag } from './Tag'
import { Image } from './Image'

Image.belongsTo(User);
User.hasMany(Image);

Image.belongsToMany(Tag, { through: 'ImageTags' });
Tag.belongsToMany(Image, { through: 'ImageTags' });

export {
    User,
    Image,
    Tag
}