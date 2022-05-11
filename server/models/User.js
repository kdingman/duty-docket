const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            minlength: 5
        },
        duties: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Duty'
            }
        ]

    }
)


// Set up pre-save middleware to create password
userSchema.pre("save", async function(next) {
    if(this.isNew || this.isModified("password")) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

// Compare pw w hashed pw
userSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
}
const User = model("User", userSchema);

module.exports = User;