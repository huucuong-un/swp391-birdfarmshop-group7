import classNames from 'classnames/bind';
import StartPartPage from '~/Components/StartPartPage/StartPartPage';
import styles from '~/Pages/AboutUs/AboutUs.module.scss';

const cx = classNames.bind(styles);

function AboutUs() {
    return (
        <div className={cx('wrapper')}>
            <StartPartPage payment>About us</StartPartPage>
            <div className={cx('inner')}>
                <div className={cx('header')}>
                    <img
                        src="https://cdn.shopify.com/s/files/1/0344/6469/files/about_title.png?v=1505310894"
                        alt="about-us"
                    />
                    <img
                        src="https://cdn.shopify.com/s/files/1/0344/6469/files/about-01_copy.png?v=1523372937"
                        alt="..."
                    />
                </div>
                <div className={cx('about-us-content')}>
                    <p>
                        Inspired by an unwavering love for parrots, 11-Twell Parrot Shop transcends the conventional
                        notion of a mere company; it stands as a vibrant community for enthusiasts to engage in the
                        latest parrot trends, news, memes, and advice, all while exploring an extensive array of
                        distinctive, parrot-themed products.
                    </p>
                    <h1>And the best part? We get to help parrots in need.</h1>
                    <p>
                        What sets us apart is our commitment to making a positive impact on parrots in need. At 11-Twell
                        Parrot Shop, we firmly believe that every parrot deserves a forever home, driving our mission to
                        support these incredible birds in every possible way. Collaborating closely with shelter
                        partners, we actively foster parrots from our premises, contribute essential supplies and
                        enrichment toys, and sponsor community parrot adoption events, all aimed at aiding parrots in
                        need.
                    </p>
                    <p>
                        As dedicated and longstanding allies, we proudly join forces with a local rescue, the Good Luck
                        Parrot Cafe. On a monthly basis, we cover the adoption fee for an adoptable parrot at the cafe,
                        striving to facilitate their journey towards finding the loving, permanent homes they rightfully
                        deserve. This exceptional parrot cafe, managed entirely by donations and volunteers through Lady
                        Luck Animal Rescue, operates as a 501(c)(3) nonprofit animal rescue.
                    </p>
                </div>
                <div className={cx('success-story-header')}>
                    <h1>Read our Foster Success Stories! </h1>
                </div>
                <div className={cx('about-us-content')}>
                    <p>
                        Our team actively participated in a program led by the Vietnam Animal Protection Association,
                        wherein we provided foster care for parrots directly from our office in Vietnam. Explore our
                        Parrots Page to discover heartwarming success stories and learn more about the positive impact
                        of our involvement in this initiative!
                    </p>
                    <div className={cx('center-img')}>
                        <img src="https://storage.googleapis.com/pod_public/1300/160173.jpg" alt="many-parrot" />
                    </div>
                    <p>
                        As the 11-Twel Parrot Shop team and community continue to expand, our aspiration is to extend
                        our fostering efforts beyond a single parrot at a time. We aim to transform 11-Twel Parrot Shop
                        into a comprehensive fostering team, seamlessly integrated with our website operations.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
