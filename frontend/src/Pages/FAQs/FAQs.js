import classNames from 'classnames/bind';
import StartPartPage from '~/Components/StartPartPage/StartPartPage';
import styles from '~/Pages/FAQs/FAQs.module.scss';
import Title from '~/Components/Title/Title';
import { Box, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react';

const cx = classNames.bind(styles);

function Faq() {
    return (
        <div className={cx('wrapper')}>
            <StartPartPage></StartPartPage>
            <div className={cx('container')}>
                <Title>Read answers to what most people ask us</Title>

                <Accordion className={cx('accordion')} allowToggle>
                    <AccordionItem className={cx('accord-item')}>
                        <h2>
                            <AccordionButton>
                                <Box as="span" flex="1" textAlign="left">
                                    DO YOU HAVE PARROTS AVAILABLE?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            Yes, it depends on the age range you want. you can place your order on our website if you
                            found the perfect parrot for you, if not you can contact us to inquire on the availability
                            of your desired species or age.
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem className={cx('accord-item')}>
                        <h2>
                            <AccordionButton>
                                <Box as="span" flex="1" textAlign="left">
                                    DO YOU SHIP?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            Yes, we ship throughout United states and out of United States.
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem className={cx('accord-item')}>
                        <h2>
                            <AccordionButton>
                                <Box as="span" flex="1" textAlign="left">
                                    HOW DO YOU SHIP BIRDS?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            We ship all our birds via a pet airlines or cargo service so that they are properly taken
                            care of. They are shipped in either wooden carriers or plastic pet kennels.
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem className={cx('accord-item')}>
                        <h2>
                            <AccordionButton>
                                <Box as="span" flex="1" textAlign="left">
                                    IS SHIPPING HARD ON THE BIRDS?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            It has been our experience that shipping is not hard on the birds. Our parrots are exposed
                            to a wide variety of things while being raised in our nursery and home. As far as they are
                            concerned, it is perfectly normal for them to get on an airplane on the 60-100th day of
                            their life and go for a trip.
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem className={cx('accord-item')}>
                        <h2>
                            <AccordionButton>
                                <Box as="span" flex="1" textAlign="left">
                                    HOW MUCH DOES IT COST TO SHIP A BIRD?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            We simply pass along what it costs us to ship a bird. The shipping cost is what the airlines
                            charge. Other costs include a pet carrier $25-$65. In addition a Vet Health Certificate may
                            be required by some airlines ($35). Approximately, shipping will cost $150 and at most $250.
                            Most at times we pay for all these cost ourselves.
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem className={cx('accord-item')}>
                        <h2>
                            <AccordionButton>
                                <Box as="span" flex="1" textAlign="left">
                                    CAN I SAVE SOME MONEY ON SHIPPING AND CAN YOU SHIP BY UPS OR US MAIL, OR...?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            Sorry, we have no experience with UPS or US Mail on live shipments, as far as we know they
                            do not do this. Several airlines have experience shipping animals including birds. We ship
                            all our parrots only through airlines licensed to ship parrots.
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
}

export default Faq;
