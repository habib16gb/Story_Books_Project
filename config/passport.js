import passport from "passport";
import passportGoogle from "passport-google-oauth20";
import mongoose from "mongoose";
import User from "../models/User.js";

const GoogleStrategy = passportGoogle.Strategy;

export default (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
        };

        try {
          let user = await User.findOne({ googleId: profile.id });

          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (error) {
          console.error(`${error.message}`.bgRed.bold);
        }
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(function (id, done) {
    User.findById(id)
      .then((user) => {
        if (!user) {
          return done(null, user);
        }
        return done(null, user);
      })
      .catch((err) => done(err));
  });
};
