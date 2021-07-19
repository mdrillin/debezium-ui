import {
  Button, FormGroup,
  InputGroup,
  Stack, 
  StackItem, 
  Tooltip
} from "@patternfly/react-core";
import { top } from "@patternfly/react-core/dist/js/helpers/Popper/thirdparty/popper-core";
import { ExclamationCircleIcon } from "@patternfly/react-icons";
import { useField } from "formik";
import * as React from "react";
import "./FormTopicGroupComponent.css";
import { HelpInfoIcon } from "./HelpInfoIcon";
import { TopicGroupItem } from './TopicGroupItem';

export interface IFormTopicGroupComponentProps {
  label: string;
  description: string;
  name: string;
  fieldId: string;
  helperTextInvalid?: any;
  isRequired: boolean;
  validated: "default" | "success" | "warning" | "error";
  i18nAddTopicGroupText: string;
  i18nAddTopicGroupTooltip: string;
  i18nRemoveTopicGroupTooltip: string;
  propertyChange: (name: string, selection: any) => void;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
}

export const FormTopicGroupComponent: React.FunctionComponent<IFormTopicGroupComponentProps> = (
  props
) => {
  const [field] = useField(props);

  const getItemRows = () => {
    return (field.value)?.split("#$");
  }

  const handleTopicGroupItemChanged = (rowId: number, topicGroupValue: string) => {
    // Break into rows
    const rows = [...getItemRows()];
    // replace element with updated content
    rows[rowId] = topicGroupValue;
    // Join elements back together
    const newValue = rows.join("#$");
    // Set new value
    props.setFieldValue(field.name, newValue, true);
  }

  const handleDeleteTopicGroupItem = (rowIndex: number) => {
    // Break into rows
    const rows = [...getItemRows()];
    rows.splice(rowIndex,1);
    // Join elements back together
    const newValue = rows.join("#$");
    // Set new value
    props.setFieldValue(field.name, newValue, true);
  }

  const onAddTopicGroup = () => {
    const newValue = field.value+"#$";
    props.setFieldValue(field.name, newValue, true);
  }

  /**
   * Return name segment from the supplied string
   * Format of string : name&&include||replicationFactor$$partitions%%retentionMs^^cleanupPolicy**compressionType
   *   name               - first segment, ended with '&&'
   *   include            - second segment, preceeded by '&&' and ended with '||'
   *   replicationFactor  - third segment, preceeded by '||' and ended with '$$'
   *   partitions         - fourth segment, preceeded by '$$' and ended with '%%'
   *   retentionMs        - fifth segment, preceeded by '%%' and ended with '^^'
   *   cleanupPolicy      - sixth segment, preceeded by '^^' and ended with '**'
   *   compressionType    - seventh segment, preceeded by '**'
   * @param val the 7 segment string
   */
  const getNameValue = (val: string) => {
    if (val && val.includes("&&")) {
      return val.split("&&")[0];
    }
    return "";
  };

  /**
   * Return include segment from the supplied string
   * Format of string : name&&include||replicationFactor$$partitions%%retentionMs^^cleanupPolicy**compressionType
   *   name               - first segment, ended with '&&'
   *   include            - second segment, preceeded by '&&' and ended with '||'
   *   replicationFactor  - third segment, preceeded by '||' and ended with '$$'
   *   partitions         - fourth segment, preceeded by '$$' and ended with '%%'
   *   retentionMs        - fifth segment, preceeded by '%%' and ended with '^^'
   *   cleanupPolicy      - sixth segment, preceeded by '^^' and ended with '**'
   *   compressionType    - seventh segment, preceeded by '**'
   * @param val the 7 segment string
   */
  const getIncludeValue = (val: string) => {
    let includeVal = "";
    if (val && val.includes("&&")) {
      const trailing = val.split("&&")[1];
      if (trailing) {
        includeVal = trailing.split("||")[0];
      }
    }
    return includeVal;
  };

  /**
   * Return replicationFactor segment from the supplied string
   * Format of string : name&&include||replicationFactor$$partitions%%retentionMs^^cleanupPolicy**compressionType
   *   name               - first segment, ended with '&&'
   *   include            - second segment, preceeded by '&&' and ended with '||'
   *   replicationFactor  - third segment, preceeded by '||' and ended with '$$'
   *   partitions         - fourth segment, preceeded by '$$' and ended with '%%'
   *   retentionMs        - fifth segment, preceeded by '%%' and ended with '^^'
   *   cleanupPolicy      - sixth segment, preceeded by '^^' and ended with '**'
   *   compressionType    - seventh segment, preceeded by '**'
   * @param val the 7 segment string
   */
  const getReplicationFactorValue = (val: string) => {
    let replicationVal = "";
    if (val && val.includes("||")) {
      const trailing = val.split("||")[1];
      if (trailing) {
        replicationVal = trailing.split("$$")[0];
      }
    }
    return replicationVal;
  };

  /**
   * Return include segment from the supplied string
   * Format of string : name&&include||replicationFactor$$partitions%%retentionMs^^cleanupPolicy**compressionType
   *   name               - first segment, ended with '&&'
   *   include            - second segment, preceeded by '&&' and ended with '||'
   *   replicationFactor  - third segment, preceeded by '||' and ended with '$$'
   *   partitions         - fourth segment, preceeded by '$$' and ended with '%%'
   *   retentionMs        - fifth segment, preceeded by '%%' and ended with '^^'
   *   cleanupPolicy      - sixth segment, preceeded by '^^' and ended with '**'
   *   compressionType    - seventh segment, preceeded by '**'
   * @param val the 7 segment string
   */
  const getPartitionsValue = (val: string) => {
    let partitionsVal = "";
    if (val && val.includes("$$")) {
      const trailing = val.split("$$")[1];
      if (trailing) {
        partitionsVal = trailing.split("%%")[0];
      }
    }
    return partitionsVal;
  };

  /**
   * Return include segment from the supplied string
   * Format of string : name&&include||replicationFactor$$partitions%%retentionMs^^cleanupPolicy**compressionType
   *   name               - first segment, ended with '&&'
   *   include            - second segment, preceeded by '&&' and ended with '||'
   *   replicationFactor  - third segment, preceeded by '||' and ended with '$$'
   *   partitions         - fourth segment, preceeded by '$$' and ended with '%%'
   *   retentionMs        - fifth segment, preceeded by '%%' and ended with '^^'
   *   cleanupPolicy      - sixth segment, preceeded by '^^' and ended with '**'
   *   compressionType    - seventh segment, preceeded by '**'
   * @param val the 7 segment string
   */
  const getRetentionValue = (val: string) => {
    let retentionVal = "";
    if (val && val.includes("%%")) {
      const trailing = val.split("%%")[1];
      if (trailing) {
        retentionVal = trailing.split("^^")[0];
      }
    }
    return retentionVal;
  };

  /**
   * Return include segment from the supplied string
   * Format of string : name&&include||replicationFactor$$partitions%%retentionMs^^cleanupPolicy**compressionType
   *   name               - first segment, ended with '&&'
   *   include            - second segment, preceeded by '&&' and ended with '||'
   *   replicationFactor  - third segment, preceeded by '||' and ended with '$$'
   *   partitions         - fourth segment, preceeded by '$$' and ended with '%%'
   *   retentionMs        - fifth segment, preceeded by '%%' and ended with '^^'
   *   cleanupPolicy      - sixth segment, preceeded by '^^' and ended with '**'
   *   compressionType    - seventh segment, preceeded by '**'
   * @param val the 7 segment string
   */
  const getCleanupPolicyValue = (val: string) => {
    let cleanupPolicyVal = "";
    if (val && val.includes("^^")) {
      const trailing = val.split("^^")[1];
      if (trailing) {
        cleanupPolicyVal = trailing.split("**")[0];
      }
    }
    return cleanupPolicyVal;
  };

  /**
   * Format of string : name&&include||replicationFactor$$partitions%%retentionMs^^cleanupPolicy**compressionType
   *   name               - first segment, ended with '&&'
   *   include            - second segment, preceeded by '&&' and ended with '||'
   *   replicationFactor  - third segment, preceeded by '||' and ended with '$$'
   *   partitions         - fourth segment, preceeded by '$$' and ended with '%%'
   *   retentionMs        - fifth segment, preceeded by '%%' and ended with '^^'
   *   cleanupPolicy      - sixth segment, preceeded by '^^' and ended with '**'
   *   compressionType    - seventh segment, preceeded by '**'
   * @param val the 7 segment string
   */
  const getCompressionTypeValue = (val: string) => {
    let compressionTypeVal = "";
    if (val && val.includes("**")) {
      const trailing = val.split("**")[1];
      compressionTypeVal = trailing ? trailing : "";
    }
    return compressionTypeVal;
  };

  const id = field.name;

  return (
    <FormGroup
      label={props.label}
      isRequired={props.isRequired}
      labelIcon={
        <HelpInfoIcon label={props.label} description={props.description} />
      }
      helperTextInvalid={props.helperTextInvalid}
      helperTextInvalidIcon={<ExclamationCircleIcon />}
      fieldId={id}
      validated={props.validated}
    >
      <InputGroup>
        <Stack hasGutter={true} className={"form-topic-group-component"}>
          {getItemRows()?.map((row: string, idx: number) => (
            <StackItem key={idx}>
              <TopicGroupItem
                rowId={idx}
                nameValue={getNameValue(row)}
                includeValue={getIncludeValue(row)}
                replicationFactorValue={getReplicationFactorValue(row)}
                partitionsValue={getPartitionsValue(row)}
                retentionMsValue={getRetentionValue(row)}
                cleanupPolicyValue={getCleanupPolicyValue(row)}
                compressionTypeValue={getCompressionTypeValue(row)}
                canDelete={getItemRows().length > 1}
                i18nRemoveTopicGroupTooltip={props.i18nRemoveTopicGroupTooltip}
                topicGroupItemChanged={handleTopicGroupItemChanged}
                deleteTopicGroupItem={handleDeleteTopicGroupItem}
              />
            </StackItem>
          ))}
          <StackItem>
            <Tooltip
              position={"right"}
              content={props.i18nAddTopicGroupTooltip}
            >
              <Button variant="link" onClick={onAddTopicGroup}>
                {props.i18nAddTopicGroupText}
              </Button>
            </Tooltip>
          </StackItem>
        </Stack>
      </InputGroup>
    </FormGroup>
  );
};
