module.exports = (function() {
    'use strict';
    var router = require('express').Router();
    var password 	= require('password-hash-and-salt');
	var jwt   		= require('jsonwebtoken');
	var Promise = require("bluebird");
	var config = require('../../config'); //don't like having to include this config file again in a child module
	var User   = require('../../app/models/user'); //confusing implementation
	var Post  = require('../../app/models/post');  //these two are used as models for our objects stored in the database
	var tokenHelper = require('../../app/helpers/tokenHelper');

//Public routes

router.get('/', function(req, res) {
	    res.send('Welcome to my API. This is currently a public route.');
});

router.get('/posts', function(req, res) {
	  Post.find({}, function(err, posts) {
	    res.json(posts);
	  });
});  

router.get('/posts/:post_id', function(req, res) {
        Post.findById(req.params.post_id, function(err, post) {
            if (err)
                res.send(err);
            res.json(post);
        });
    });

router.post('/register', function(req, res) {
    
        var user = new User();    
        user.name = req.body.name;

			password(req.body.password).hash(function(error, hash) {
				if (error) res.send(error);
		 		user.password = hash;

		        user.save(function(err) {
		            if (err){
		                res.send(err);
		            }else{
		            	var token = jwt.sign({name: user.name}, config.secret, {expiresIn : config.TOKEN_EXPIRATION });
		            	req.session.logged_in = 'true';
			    	  	req.session.username = user.name;
			    	  	req.session.token = token;
		            	res.json({ message: 'User created!' });
		            }
		        });

		 	});        
    });

router.get('/logout', function(req, res) {
	req.session.destroy(function (err){
		if(err) res.send(err);
		console.log("Session destroyed");
		res.json({ message: 'Session deleted!' });
	});
	/*
	req.session.regenerate(function onComplete(err) {});
	*/
});


router.post('/authenticate', function(req, res) {

	  User.findOne({
	    name: req.body.name
	  }, function(err, user) {

	    if (err){
	    	console.log(err);
	    	res.send(err);
	    } 

	    if (!user) {
	      res.json({ success: false, message: 'Authentication failed. User not found.' });
	    } else if (user) {
			password(req.body.password).verifyAgainst(user.password, function(error, verified) {
			if(!verified) {
	  	      res.json({ success: false, message: 'Authentication failed. Wrong password.' });
			} else {
						if(user.admin = 'true'){
				        	req.session.admin = 'true';
						}else{
							req.session.admin = 'false';
						}
				        var token = jwt.sign({name: user.name}, config.secret, { expiresIn : config.TOKEN_EXPIRATION });

			    	  req.session.logged_in = 'true';
			    	  req.session.username = user.name;
			    	  req.session.token = token;

			        res.json({
			          success: true,
			          message: 'Enjoy your token!',
			          token: token
			        });

			}
		});

	  };
	});
});


//Routes that require authentication

router.use(function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.session.token;

  if (token) {
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) {
      		res.send(err);
	   }else{

		      	var newToken = tokenHelper.refreshToken(decoded,req.session.username);
			    if(newToken) {
			        req.decoded = newToken;    
			        req.session.token = newToken;
			        next();
	            } else {
			        req.decoded = decoded;    
			        next();
	            }
	    }

    });
  } else {

    return res.status(403).send({ 
        success: false, 
        message: 'No token or bad provided.' 
    });
    
  }
});

	router.get('/open_sesame', function(req, res) {
		    res.send('Welcome to my API. This is currently a private route verified by token.');
	});


router.post('/posts', function(req, res) {
        
        var post = new Post(); 
        post.author = req.session.username
        post.content = req.body.content;

        post.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Post created!' });
        });
        
    });

router.put('/posts' , function(req, res) {

	var cookie = req.session.username;

	if(cookie){
		var action = Post.findById(req.body.post_id).exec();

		 action.then(function (post) {
		  if(post.author == cookie){
		  		post.content = req.body.content;

		  		post.save(function(err){
		  			if(err)
		  				res.send(err);

		  			res.json({ message: 'Post updated!' });
		  		});
		  }else{
		  	res.send("Error deleting posts");
		  }
		 });
	}else{

	    return res.status(403).send({ 
	        success: false, 
	        message: 'Bad cookie provided.' 
	    });		
	}
    });


router.delete('/posts' , function(req, res) {

	var cookie = req.session.username;

	if(cookie){
		var action = Post.findById(req.body.post_id).exec();

		 action.then(function (post) {
		  if(post.author == cookie){
		  		post.content = req.body.content;

		  		post.remove(function(err){
		  			if(err)
		  				res.send(err);

		  			res.json({ message: 'Post deleted!' });
		  		});
		  }else{
		  	res.send("Error deleting post.");
		  }
		 });
	}else{
			
		return res.status(403).send({ 
	        success: false, 
	        message: 'Bad cookie provided.' 
	    });		

		}

 });


//Admin only routes
	router.use(function(req, res, next) {
	  var admin = req.session.admin;

	  if (admin == 'true') {
	        next();
	  }else {
	    return res.status(403).send({ 
	        success: false, 
	        message: 'Access not provided.' 
	    });
	  }
	});

	router.get('/users', function(req, res) {
	  User.find({}, function(err, users) {
	    res.json(users);
	  });
	});   

	router.delete('/posts/admin' , function(req, res) {

		var action = Post.findById(req.body.post_id).exec();

		 action.then(function (post) {
		  		post.remove(function(err){
		  			if(err)
		  				res.send(err);

		  			res.json({ message: 'Post deleted!' });
		  		});
		 });
	 });

return router;
})();

