const { google } = require("googleapis");
const fs = require("fs");
const multer = require("multer");
require("dotenv").config();

let Uploadimage = [];
let Uploadaudio = [];
let Uploadvideo = [];
let Uploadapplication = [];
let text = {
    name: "",
    email: "",
    phone: "",
    wallet: "",
    name1: "",
    social: "",
    price: "",
};

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";

const REFRESH_TOKEN = process.env.REFRESH_TOKEN ;

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
    version: "v3",
    auth: oauth2Client
});

const docs = google.docs({
    version: "v1",
    auth: oauth2Client
});

async function createTextFIle(fileName, folderWhereToUpload) {
    try {
        const response = await drive.files.create({
            requestBody: {
                name: fileName,
                mimeType: "application/vnd.google-apps.document",
                parents: [folderWhereToUpload]
            },
        });

        return response.data.id;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function textUpload(id) {
    try {
        const response = await docs.documents.batchUpdate({
            documentId: id,
            requestBody: {
                requests: [
                    {
                        insertText: {
                            location: { index: 1 },
                            text: `
                                name: ${text.name}
                                email: ${text.email}
                                phone: ${text.phone}
                                wallet: ${text.wallet}
                                collection-name: ${text.name1}
                                ${text.social !== '' ? `social: ${text.social}\n` : '(no social media handle sent)'}
                                price: ${text.price}
                            `
                        }
                    }
                ]
            }
        });

        return response.data;
    }
    catch (error) {
        throw new Error(error.message);
    }
};

async function createFolder(parentFolder) {
    let folderName = `${text.name} ${text.email}`;
    try {
        const response = await drive.files.create({
            requestBody: {
                name: folderName,
                mimeType: "application/vnd.google-apps.folder",
                parents: [parentFolder]
            },
        });

        return response.data.id;
    } catch (error) {
        console.log(error)
        throw new Error(error.message);
    }
}

async function createFolderInsideFolder(FolderInsideFolder, parentFolder) {
    try {
        const response = await drive.files.create({
            requestBody: {
                name: FolderInsideFolder,
                parents: [parentFolder],
                mimeType: "application/vnd.google-apps.folder",
            },
        });

        return response.data.id;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function uploadFile1(fileName, folderWhereToUpload) {
    var path = "./images/" + fileName;

    try {
        await drive.files.create({
            requestBody: {
                name: fileName, //This can be name of your choice
                parents: [folderWhereToUpload],
            },
            media: {
                body: fs.createReadStream(path),
            },
        });
    } catch (error) {
        throw new Error(error.message);
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images/");
    },
    filename: (req, file, cb) => {
        var temp = file.originalname;

        if (file.mimetype.substring(0, file.mimetype.indexOf("/")) === "image") Uploadimage.push(temp);
        else if (file.mimetype.substring(0, file.mimetype.indexOf("/")) === "audio") Uploadaudio.push(temp);
        else if (file.mimetype.substring(0, file.mimetype.indexOf("/")) === "video") Uploadvideo.push(temp);
        else Uploadapplication.push(temp);
        console.log(Uploadimage, 6)

        cb(null, file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype.substring(0, file.mimetype.indexOf("/")) === "image" ||
        file.mimetype.substring(0, file.mimetype.indexOf("/")) === "audio" ||
        file.mimetype.substring(0, file.mimetype.indexOf("/")) === "video" ||
        file.mimetype.substring(0, file.mimetype.indexOf("/")) === "application"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter,
}).array("file", 10);

function unlink() {
    for (var i = 0; i < Uploadimage.length; i++) {
        fs.unlink("images/" + Uploadimage[i], error => {
            if (error) throw new Error(error.message);

            Uploadimage = [];
        });
    }
    for (var i = 0; i < Uploadaudio.length; i++) {
        fs.unlink("images/" + Uploadaudio[i], error => {
            if (error) throw new Error(error.message);

            Uploadaudio = [];
        });
    }
    for (var i = 0; i < Uploadvideo.length; i++) {
        fs.unlink("images/" + Uploadvideo[i], error => {
            if (error) throw new Error(error.message);

            Uploadvideo = [];
        });
    }
    for (var i = 0; i < Uploadapplication.length; i++) {
        fs.unlink("images/" + Uploadapplication[i], error => {
            if (error) throw new Error(error.message);

            Uploadapplication = [];
        });
    }
};

const finalupload = async () => {
    try {
        const response = await createFolder("1veePml1wXVsKmOvp22Gkz-38SeWjf1tn");

        if (Uploadimage.length > 0) {
            try {
                const parentId = await createFolderInsideFolder("Images", response);

                for (var i = 0; i < Uploadimage.length; i++) {
                    await uploadFile1(Uploadimage[i], parentId);
                }
            }
            catch (error) {
                throw new Error(error.message);
            }
        }

        if (Uploadaudio.length > 0) {
            try {
                const parentId = await createFolderInsideFolder("Audios", response);

                for (var i = 0; i < Uploadaudio.length; i++) {
                    await uploadFile1(Uploadaudio[i], parentId);
                }
            }
            catch (error) {
                throw new Error(error.message);
            }
        }

        if (Uploadvideo.length > 0) {
            try {
                const parentId = await createFolderInsideFolder("Videos", response);

                for (var i = 0; i < Uploadvideo.length; i++) {
                    await uploadFile1(Uploadvideo[i], parentId);
                }
            }
            catch (error) {
                throw new Error(error.message);
            }
        }

        if (Uploadapplication.length > 0) {
            try {
                const parentId = await createFolderInsideFolder("Other", response);

                for (var i = 0; i < Uploadapplication.length; i++) {
                    await uploadFile1(Uploadapplication[i], parentId);
                }
            }
            catch (error) {
                throw new Error(error.message);
            }
        }

        await textUpload(await createTextFIle(text.name, response));
    }
    catch (error) {
        console.log(1000)
        throw new Error(error);
    }
};

exports.createPostFile = (req, res, next) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json({
                message: false
            });
        } else if (err) {
            return res.status(500).json({
                message: false
            });
        }
        finalupload().then(() => {
            unlink();

            return res.status(200).json({
                message: true,
            });
        }).catch(error => {
            unlink();

            return res.status(444).json({
                message: false,
            });
        });
    });
};

exports.createPost = (req, res, next) => {
    const Name = req.body.text.name;
    const Email = req.body.text.email;
    const PhoneNumber = req.body.text.phone;
    const wallet = req.body.text.wallet;
    const name1 = req.body.text.name1;
    const social = req.body.text.social;
    const price = req.body.text.price;

    text.name = Name;
    text.email = Email;
    text.phone = PhoneNumber;
    text.wallet = wallet;
    text.name1 = name1;
    text.social = social;
    text.price = price;

    return res.status(200).json({
        message: true
    });
};