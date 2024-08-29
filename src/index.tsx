import * as React from 'react';

import {Document, G, Image, Link, Page, Path, StyleSheet, Svg, Text, View} from '@react-pdf/renderer';
import {BulkLoad, SingleLoad} from "@react-pdf/types/font";

export const getFonts = (): Array<SingleLoad | BulkLoad> => {
    return [
        {
            family: "Ubuntu",
            src: "https://fonts.gstatic.com/s/ubuntu/v9/2Q-AW1e_taO6pHwMXcXW5w.ttf",
        },
        {
            family: "Ubuntu",
            src: "https://fonts.gstatic.com/s/ubuntu/v9/B7BtHjNYwAp3HgLNagENOQ.ttf",
            fontWeight: "bold",
        }
    ]
}


const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: 'rgb(237, 242, 248)',
        gap: 0,
        fontFamily: 'Ubuntu',
    },
    pageBackground: {
        position: 'absolute',
        zIndex: -1,
        width: '100vw',
        height: '100vh',
    },
    pageSection: {
        margin: 0,
        padding: 0,
        flexGrow: 1,
        flexDirection: "column",
        gap: 24,
        position: "relative"
    },
    titleSection: {
        margin: 12,
        padding: 12,
        flexDirection: "column",
        gap: 24,
        paddingLeft: 64,
        paddingRight: 64,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'Ubuntu',
    },
    subtitle: {
        fontSize: 12,
        textAlign: 'center',
    },
    traitsImageSection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 12,
        paddingLeft: 24,
    },
    traitsContainer: {
        flexDirection: 'column',
    },
    traits: {
        // flexGrow: 1,
        border: '1px solid rgb(42, 89, 146)',
        padding: 12,
        flexDirection: "column",
        gap: 12,
        fontSize: 14,
        fontFamily: 'Helvetica-Bold',
        fontWeight: 'bold',
        maxWidth: 290,
        maxHeight: 265,
        alignSelf: "stretch"
    },
    traitsTitle: {
        fontSize: 14,
        fontFamily: "Ubuntu",
        fontWeight: 'bold',
    },
    traitsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
        fontWeight: "normal",
        fontSize: 14
    },
    traitTypes: {
        flexDirection: "column",
        gap: 4,
        minWidth: 130,
        maxLines: 1,
        textOverflow: 'ellipsis',
    },
    traitType: {},
    traitValues: {
        flexDirection: "column",
        gap: 4,
        minWidth: 130,
        maxLines: 1,
        textOverflow: 'ellipsis',
    },
    traitValue: {},
    descriptionContainer: {
        flexDirection: 'column',
        gap: 4,
    },
    description: {
        fontSize: 10,
        fontFamily: 'Ubuntu',
        fontWeight: 'normal',
        maxLines: 3,
        textOverflow: 'ellipsis',
    },
    moreLink: {
        fontSize: 10,
        fontFamily: 'Ubuntu',
        textAlign: 'center',
        fontWeight: 'normal',
        color: 'black',
        textDecoration: "none"
    },
    image: {
        width: 236,
        paddingRight: 0,
        maxHeight: 265,
        objectFit: 'contain',
        objectPosition: 'center',
        backgroundColor: 'rgb(255, 255, 255)',
        paddingLeft: 12,
        paddingTop: 12,
        paddingBottom: 12,
    },
    detailsQrCodesSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detailsSection: {
        flexDirection: "column",
        gap: 24,
        paddingLeft: 24,
    },
    detailsGroup: {
        flexDirection: "column",
        gap: 4,
    },
    detailsTitle: {
        fontSize: 12,
        fontWeight: "bold",
    },
    detailsTypes: {
        flexDirection: "column",
        gap: 4,
        fontFamily: 'Ubuntu',
    },
    detailsValues: {
        flexDirection: "column",
        gap: 4,
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
        fontWeight: "normal",
        fontSize: 10
    },
    qrCodesSection: {
        flexDirection: 'column',
        width: 165,
        gap: 24,
        paddingRight: 48,
    },
    qrCodeItem: {
        flexDirection: 'column',
        gap: 4,
    },
    qrCodeLinkStyle: {
        color: "rgb(63, 128, 207)",
        fontSize: 10,
        fontFamily: 'Ubuntu',
        textAlign: 'center',
        display: "flex",
        maxWidth: 165,
    },
    logo: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        transform: "scale(0.5)",
        justifyContent: 'center',
        alignItems: 'center',
    }
});


export const CertificateDocument = (data: {
    title: string;
    traits: {
        trait_type: string;
        value: string;
    }[],
    draft: boolean;
    creationDate: string;
    blockchainName: string;
    collectionName: string;
    certificateType: string;
    collectionAddress: string;
    tokenId: string;
    metadataHash: string;
    certifierName: string;
    certifierAffiliation: string;
    certifierAddress: string;
    currentTimestamp: string;
    imageUrl: string;
    itemUri: string;
    itemQrCode: string;
    blockchainExplorerUrl: string;
    blockchainQrCode: string;
    certificateBg: any;
    description: string;
}) => {
    const traitRowMaxChars = 32;
    const rowsOccupiedByTraits = data.traits.length;

    const descriptionRowMaxChars = 50;

    const descriptionMaxLines = 13 - rowsOccupiedByTraits

    // Calculate max lines based on description length.
    // take into account the next line breaks
    let descriptionLines = 0;

    for (let i = 0; i < data.description.length; i++) {
        if (data.description[i] === '\n') {
            descriptionLines++;

        } else if (i % descriptionRowMaxChars === 0) {
            descriptionLines++;

        }
    }

    const descriptionShowMore = descriptionLines > descriptionMaxLines;

    return (
        <Document>
            <Page size="A4" style={styles.page}>


                <View style={styles.pageSection}>
                    <View style={styles.titleSection}>
                        <Text style={styles.title}>
                            Certificate of Authenticity
                        </Text>
                        <Text style={styles.subtitle}>
                            This is a copy of the digital certificate that was created on the Blockchain by a registered
                            certifier to prove authenticity of the physical item. You can authenticate this copy by
                            tapping the NFC chip on the item using your smartphone device.
                        </Text>
                    </View>
                    <View style={styles.traitsImageSection}>

                        <View style={styles.traitsContainer}>
                            <View style={styles.traits}>
                                <Text style={styles.traitsTitle}>
                                    {data.title}
                                </Text>

                                <View style={styles.traitsRow}>
                                    <View style={styles.traitTypes}>
                                        {data.traits.map((trait) => {
                                            // evenly distribute the traits
                                            return (
                                                <Text key={trait.trait_type}>
                                                    {trait.trait_type.substring(0, Math.min(traitRowMaxChars / 2, trait.trait_type.length))}
                                                    {trait.trait_type.length > traitRowMaxChars / 2 ? '...' : ''}:
                                                </Text>
                                            );
                                        })}
                                    </View>

                                    <View style={styles.traitValues}>
                                        {data.traits.map((trait) => {
                                            return (
                                                <Text
                                                    key={trait.value}
                                                    style={styles.traitValue}
                                                >
                                                    {trait.value.substring(0, Math.min(traitRowMaxChars / 2, trait.value.length))}
                                                    {trait.value.length > traitRowMaxChars / 2 ? '...' : ''}
                                                </Text>
                                            );
                                        })}
                                    </View>
                                </View>

                                <View style={styles.descriptionContainer}>
                                    <Text style={{
                                        ...styles.description,
                                        // calculate max lines based on number of traits
                                        maxLines: descriptionMaxLines,
                                    }}>
                                        {data.description}
                                    </Text>
                                    {descriptionShowMore && (
                                        <Link style={styles.moreLink} href={data.itemUri}>
                                            (See more using the link or QR Code)
                                        </Link>)
                                    }
                                </View>


                            </View>
                        </View>


                        <View style={styles.traitsContainer}>
                            <Image src={data.imageUrl} style={styles.image}/>
                        </View>

                    </View>

                    <View style={styles.detailsQrCodesSection}>

                        <View style={styles.detailsSection}>
                            <View style={styles.detailsGroup}>
                                <Text style={styles.detailsTitle}>
                                    Certificate Details:
                                </Text>
                                <View style={styles.detailsRow}>
                                    <View style={styles.detailsTypes}>
                                        <Text>
                                            Creation Date:
                                        </Text>
                                        <Text>
                                            Blockchain:
                                        </Text>
                                        <Text>
                                            Collection Name:
                                        </Text>
                                        <Text>
                                            Certificate Type:
                                        </Text>
                                        <Text>
                                            Smart Contract:
                                        </Text>
                                        <Text>
                                            Token ID:
                                        </Text>
                                        <Text>
                                            Metadata Hash:
                                        </Text>
                                    </View>
                                    <View style={styles.detailsValues}>
                                        <Text>
                                            {data.creationDate}
                                        </Text>
                                        <Text>
                                            {data.blockchainName}
                                        </Text>
                                        <Text>
                                            {data.collectionName}
                                        </Text>
                                        <Text>
                                            {data.certificateType}
                                        </Text>
                                        <Text>
                                            {data.collectionAddress}
                                        </Text>
                                        <Text>
                                            {data.tokenId}
                                        </Text>
                                        <Text>
                                            {data.metadataHash}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.detailsGroup}>
                                <Text style={styles.detailsTitle}>
                                    Certifier:
                                </Text>
                                <View style={styles.detailsRow}>
                                    <View style={styles.detailsTypes}>
                                        <Text>
                                            {data.certifierName}
                                        </Text>
                                        <Text>
                                            {data.certifierAffiliation}
                                        </Text>
                                        <Text>
                                            Certifier Wallet: {data.certifierAddress}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.detailsGroup}>
                                <Text style={styles.detailsTitle}>
                                    Certificate Copy:
                                </Text>
                                <View style={styles.detailsRow}>
                                    <View style={styles.detailsTypes}>
                                        <Text>
                                            This copy was generated on: {data.currentTimestamp}
                                        </Text>

                                        <Text>
                                            Learn more about digital certificates at www.ownerchip.com/certificates
                                        </Text>
                                    </View>
                                </View>
                            </View>

                        </View>

                        <View style={styles.qrCodesSection}>
                            <View style={styles.qrCodeItem}>
                                <Image src={data.itemQrCode}/>
                                <Link style={styles.qrCodeLinkStyle} src={data.itemUri}>
                                    CLICK HERE to view item details & access digital content
                                </Link>
                            </View>

                            <View style={styles.qrCodeItem}>
                                <Image src={data.blockchainQrCode}/>
                                <Link style={styles.qrCodeLinkStyle} src={data.blockchainExplorerUrl}>
                                    CLICK HERE to view entry on Blockchain
                                </Link>
                            </View>
                        </View>

                    </View>

                    <View style={styles.logo}>
                        <Svg style={{width: 238, height: 50}}>
                            <G>
                                <Path fill={"#0C1A4B"}
                                      d="M85.2,25c0,7.4-3.1,9.3-10.1,9.3C68,34.3,65,32.4,65,25c0-7.4,3.1-9.3,10.1-9.3C82.2,15.7,85.3,17.6,85.2,25    M75.1,30.4c3.6,0,4.6-1.8,4.6-5.4s-1-5.4-4.6-5.4s-4.6,1.8-4.6,5.4S71.5,30.4,75.1,30.4"></Path>
                                <Path fill={"#0C1A4B"}
                                      d="M94.3,27.9c0,0.2,0.2,0.6,0.3,0.6c0.2,0,0.3-0.3,0.3-0.5l3-10.4c0.3-1.2,1.4-1.8,3.2-1.8s2.9,0.6,3.3,1.8   l3,10.4c0,0.2,0.1,0.5,0.3,0.5s0.3-0.3,0.3-0.6l3.1-12h5.2l-4.3,15.4c-0.5,1.9-1.4,3.1-4,3.1s-3.6-1-3.9-2.3l-2.8-9.7   c-0.1-0.2-0.1-0.6-0.3-0.6c-0.1,0-0.2,0.4-0.3,0.6L98.2,32c-0.4,1.3-1.4,2.3-3.9,2.3c-2.6,0-3.5-1.2-4-3.1L86,15.9h5.2L94.3,27.9z"></Path>
                                <Path fill={"#0C1A4B"}
                                      d="M117.8,19.3c0-2.4,1.2-3.4,3.4-3.4h7.4c4.3,0,7.2,1.9,7.2,6.6v11.7h-5.4V23.8c0-2.8-1-4-3.8-4h-2.3   c-0.9,0-1.2,0.3-1.2,1.2v13.1h-5.4V19.3z"></Path>
                                <Path fill={"#0C1A4B"}
                                      d="M145.2,34.1c-5.9,0-7-2.5-7-9.2c0-7.8,2.1-9.3,9.3-9.3c6,0,9.3,1,9.3,7.3c0,2.1-0.6,3.8-2.9,3.8h-10.3   c0,2.2,0.7,3.5,3.7,3.5h8.9v3.9L145.2,34.1z M150.4,23.1c1,0,1-0.7,1-1.1c0-1.9-2.1-2.4-3.8-2.4c-2.6,0-3.9,0.9-3.9,3.6L150.4,23.1   z"></Path>
                                <Path fill={"#0C1A4B"}
                                      d="M159.2,23.1c0-5.4,2.8-7.2,8.2-7.2h3.6v4h-2.1c-3.2,0-4.3,1.7-4.3,4.9v9.4h-5.4V23.1z"></Path>
                                <Path fill={"#0C1A4B"}
                                      d="M179.4,34.1c-6.2,0-7.7-3.6-7.7-9.1s1.5-9.1,7.7-9.1h8.7v4h-6.7c-3.5,0-4.2,2.1-4.2,5.2s0.7,5.2,4.2,5.2h7v4   L179.4,34.1z"></Path>
                                <Path fill={"#0C1A4B"}
                                      d="M190.6,10h5.4v5.9h5.3c4.3,0,7.3,1.9,7.3,6.6v11.7h-5.4V23.8c0-2.8-1-4-3.8-4H196v14.3h-5.4L190.6,10z"></Path>
                                <Path fill={"#0C1A4B"}
                                      d="M211.6,10h5.4v3.9h-5.4L211.6,10z M211.6,15.9h5.4v18.3h-5.4L211.6,15.9z"></Path>
                                <Path fill={"#0C1A4B"}
                                      d="M230.5,15.9c5.9,0,7.5,3.6,7.5,9.1s-1.7,9.1-7.5,9.1h-5.2V40h-5.4V19.3c-0.2-1.7,1-3.2,2.7-3.4   c0.2,0,0.5,0,0.8,0L230.5,15.9z M225.2,30.2h3.8c3.1,0,3.5-2.6,3.5-5.2c0-2.8-0.3-5.2-3.5-5.2h-2.3c-1,0-1.4,0.3-1.4,1.3   L225.2,30.2z"></Path>
                                <Path fill={"#4D79FF"}
                                      d="M11.1,0v11.1H0V5.6h5.6V0H11.1z M44.4,50v-5.6H50v-5.6H38.9V50H44.4z M0,44.4h5.6V50h5.6V38.9H0V44.4z M50,5.6   h-5.6V0h-5.6v11.1H50V5.6z M16.7,11.1h-5.6v5.6H0v5.6h11.1v5.6H0v5.6h11.1v5.6h5.6V50h5.6V33.3h-5.6V16.7h5.6V0h-5.6V11.1z    M50,22.2v-5.6H38.9v-5.6h-5.6V0h-5.6v16.7h5.6v11.1l0,0v5.6h-5.6V50h5.6V38.9h5.6v-5.6H50v-5.6H38.9v-5.6H50z"></Path>

                            </G>
                        </Svg>
                    </View>

                </View>

                <Image
                    src={data.certificateBg.src}
                    style={{...styles.pageBackground}}
                />
            </Page>
        </Document>
    );
}

