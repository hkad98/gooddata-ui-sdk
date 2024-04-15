// (C) 2021-2024 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
import { Bubble, BubbleHoverTrigger } from "../../../Bubble/index.js";
import { useComponentLabelsContext } from "./ComponentLabelsContext.js";
import { DialogModeType } from "./types.js";

const alignPoints = [{ align: "cr cl" }];

export interface IGranteeRemoveIconProps {
    mode: DialogModeType;
    onClick: () => void;
}

export const GranteeUserIcon: React.FC = () => {
    return (
        <div className="gd-grantee-item-icon-left-background">
            <span className="gd-grantee-item-icon gd-grantee-icon-user gd-grantee-item-icon-left" />
        </div>
    );
};

export const GranteeUserInactiveIcon: React.FC = () => {
    return (
        <div className="gd-grantee-item-icon-left-background">
            <span className="gd-grantee-item-icon-inactive gd-grantee-icon-user gd-grantee-item-icon-left" />
        </div>
    );
};

export const GranteeGroupIcon: React.FC = () => {
    return (
        <div className="gd-grantee-item-icon-left-background">
            <span className="gd-grantee-item-icon gd-grantee-icon-group gd-grantee-item-icon-left" />
        </div>
    );
};

export const WorkspaceIcon: React.FC = () => {
    return (
        <div className="gd-grantee-item-icon-left-background">
            <span className="gd-grantee-item-icon gd-grantee-item-icon-left">
                <svg
                    width="14"
                    height="15"
                    viewBox="0 0 14 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M13.5967 4.4707C13.7106 4.66211 13.8063 4.90137 13.8838 5.18848C13.9613 5.47559 14 5.72852 14 5.94727V8.05273C14 8.2806 13.9339 8.48568 13.8018 8.66797C13.6696 8.8457 13.5033 8.96875 13.3027 9.03711V13.6514C13.3027 13.9385 13.2002 14.1846 12.9951 14.3896C12.79 14.5947 12.5417 14.6973 12.25 14.6973H1.75C1.45833 14.6973 1.20996 14.5947 1.00488 14.3896C0.799805 14.1846 0.697266 13.9385 0.697266 13.6514V9.03711C0.496745 8.96875 0.330404 8.8457 0.198242 8.66797C0.0660807 8.48568 0 8.2806 0 8.05273V5.94727C0 5.72852 0.038737 5.47559 0.116211 5.18848C0.193685 4.90137 0.289388 4.66211 0.40332 4.4707L2.14648 1.47656C2.27409 1.25781 2.46777 1.07324 2.72754 0.922852C2.9873 0.772461 3.24479 0.697266 3.5 0.697266H10.5C10.7552 0.697266 11.0127 0.772461 11.2725 0.922852C11.5322 1.07324 11.7259 1.25781 11.8535 1.47656L13.5967 4.4707ZM2.74805 1.83203L1.00488 4.81934C0.995768 4.83301 0.986654 4.84668 0.977539 4.86035C0.972982 4.87402 0.968424 4.8877 0.963867 4.90137C0.977539 4.90137 0.991211 4.90137 1.00488 4.90137C1.01855 4.90137 1.03451 4.90137 1.05273 4.90137H12.9473C12.9655 4.90137 12.9814 4.90137 12.9951 4.90137C13.0088 4.90137 13.0225 4.90137 13.0361 4.90137C13.0316 4.8877 13.0247 4.87402 13.0156 4.86035C13.0111 4.84668 13.0042 4.83301 12.9951 4.81934L11.252 1.83203C11.1836 1.7181 11.0742 1.61784 10.9238 1.53125C10.7734 1.44466 10.6322 1.40137 10.5 1.40137H3.5C3.36784 1.40137 3.22656 1.44466 3.07617 1.53125C2.92578 1.61784 2.81641 1.7181 2.74805 1.83203ZM12.25 14C12.3457 14 12.4277 13.9658 12.4961 13.8975C12.5645 13.8291 12.5986 13.7471 12.5986 13.6514V9.09863H1.40137V13.6514C1.40137 13.7471 1.43555 13.8291 1.50391 13.8975C1.57227 13.9658 1.6543 14 1.75 14H12.25ZM13.3027 8.05273V5.94727C13.3027 5.85156 13.2686 5.76953 13.2002 5.70117C13.1318 5.63281 13.0475 5.59863 12.9473 5.59863H1.05273C0.952474 5.59863 0.868164 5.63281 0.799805 5.70117C0.731445 5.76953 0.697266 5.85156 0.697266 5.94727V8.05273C0.697266 8.14844 0.731445 8.23047 0.799805 8.29883C0.868164 8.36719 0.952474 8.40137 1.05273 8.40137H12.9473C13.0475 8.40137 13.1318 8.36719 13.2002 8.29883C13.2686 8.23047 13.3027 8.14844 13.3027 8.05273ZM8.75 11.9014C9.04167 11.9014 9.29004 11.7988 9.49512 11.5938C9.7002 11.3887 9.80273 11.1403 9.80273 10.8486C9.80273 10.5615 9.7002 10.3154 9.49512 10.1104C9.29004 9.90527 9.04167 9.80273 8.75 9.80273H5.25C4.95833 9.80273 4.70996 9.90527 4.50488 10.1104C4.2998 10.3154 4.19727 10.5615 4.19727 10.8486C4.19727 11.1403 4.2998 11.3887 4.50488 11.5938C4.70996 11.7988 4.95833 11.9014 5.25 11.9014H8.75ZM5.25 10.5H8.75C8.8457 10.5 8.92773 10.5342 8.99609 10.6025C9.06445 10.6709 9.09863 10.7529 9.09863 10.8486C9.09863 10.9443 9.06445 11.0264 8.99609 11.0947C8.92773 11.1631 8.8457 11.1973 8.75 11.1973H5.25C5.1543 11.1973 5.07227 11.1631 5.00391 11.0947C4.93555 11.0264 4.90137 10.9443 4.90137 10.8486C4.90137 10.7529 4.93555 10.6709 5.00391 10.6025C5.07227 10.5342 5.1543 10.5 5.25 10.5Z"
                        fill="#B0BECA"
                    />
                </svg>
            </span>
        </div>
    );
};

export const GranteeRemoveIcon: React.FC<IGranteeRemoveIconProps> = (props) => {
    const { onClick, mode } = props;
    const labels = useComponentLabelsContext();
    return (
        <BubbleHoverTrigger showDelay={0} hideDelay={0} className="gd-grantee-item-delete">
            <span
                className="gd-grantee-item-icon gd-grantee-icon-trash gd-grantee-item-icon-right s-gd-grantee-item-delete"
                onClick={onClick}
                aria-label="Share dialog grantee delete"
            />
            <Bubble className="bubble-primary" alignPoints={alignPoints}>
                {mode === "ShareGrantee" ? (
                    <> {labels.removeAccessGranteeTooltip} </>
                ) : (
                    <FormattedMessage id={"shareDialog.share.grantee.item.remove.selection"} />
                )}
            </Bubble>
        </BubbleHoverTrigger>
    );
};

export const GranteeOwnerRemoveIcon: React.FC = () => {
    const labels = useComponentLabelsContext();

    return (
        <BubbleHoverTrigger showDelay={0} hideDelay={0} className="gd-grantee-item-delete-owner">
            <span className="gd-grantee-item-icon gd-grantee-item-icon-owner gd-grantee-item-icon-right">
                <FormattedMessage id={"shareDialog.share.grantee.item.creator"} />
            </span>
            <Bubble className="bubble-primary" alignPoints={alignPoints}>
                {labels.removeAccessCreatorTooltip}
            </Bubble>
        </BubbleHoverTrigger>
    );
};
