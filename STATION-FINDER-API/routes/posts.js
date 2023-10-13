const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");


// create a station post
router.post("/", async (req, res) => {
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err)
    }
});

// update a station post
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("The station post has been updated")
        } else {
            res.status(403).json("You can update only your own station post");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// delete a station post
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("The station post has been deleted")
        } else {
            res.status(403).json("You can delete only your own station post");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// like/unlike a station post
router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("The station post has been liked");
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("The station post has been unliked");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// get a station post
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});



// get timeline station post
router.get("/timeline/:userId", async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ userId: friendId });
            })
        );
        res.status(200).json(userPosts.concat(...friendPosts))
    } catch (err) {
        res.status(500).json(err)
    }
});

// Get user's all post

router.get("/profile/:username", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username })
        const posts = await Post.find({ userId: user._id });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err)
    }
});



// router.get('/timeline/all', async (req, res) => {
//     try {
//         const { userId } = req.query;

//         // Check if the user ID is valid 
//         if (!userId) {
//             return res.status(400).json({ message: 'Invalid user ID' });
//         }

//         // Find the user by ID
//         const currentUser = await User.findById(userId);

//         if (!currentUser) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Fetch user posts
//         const userPosts = await Post.find({ userId: currentUser._id });

//         // Fetch posts from friends (assuming you store friend IDs in currentUser.followings)
//         const friendPosts = await Post.find({ userId: { $in: currentUser.followings } });

//         // Combine userPosts and friendPosts and sort by timestamp (or any relevant criteria)
//         const timelinePosts = userPosts.concat(friendPosts).sort((a, b) => b.timestamp - a.timestamp);

//         res.json(timelinePosts);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });




module.exports = router;
