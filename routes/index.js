module.exports = {
    main: (req, res) => {
        res.type('html')
        res.send(`<html>
                <h3>Hi, thanks for using my Express.js lab 👏</h3>
                <p>If you found it useful, <a href="https://github.com/users/alexellis/sponsorship">become my GitHub Sponsor</a> today 👑</p>
                <p>Alex</p>
                </html>
    `);
    },
    health: (req, res) => {
        res.send("OK");
    }
}

