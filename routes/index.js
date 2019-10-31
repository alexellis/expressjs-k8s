module.exports = {
    main: (req, res) => {
        res.type('html')
        res.send(`<html>
                <h3>Hi, thanks for using my Express.js lab 👏</h3>
                <p>If you found it useful, <a href="https://github.com/users/alexellis/sponsorship">view my other GitHub projects</a> today 👑</p>
                <p>Alex Ellis</p>
                </html>
    `);
    },
    links: (req, res) => {
        res.type("json")
        res.send(
            [
                {
                    "name": "github",
                    "url": "https://github.com/alexellis"
                },
                {
                    "name": "twitter",
                    "url": "https://twitter.com/alexellisuk"
                },
                {
                    "name": "blog",
                    "url": "https://blog.alexellis.io"
                },
                {
                    "name": "sponsors",
                    "url": "https://github.com/users/alexellis/sponsorship"
                },
            ])
    },
    health: (req, res) => {
        res.send("OK");
    }
}
