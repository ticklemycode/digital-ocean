# Setting up AWS CLI

### Install pip, if it's not already installed
Run `pip --version` to see if it's installedIf it's not installed, run this to install it:
```bash
curl -O https://bootstrap.pypa.io/get-pip.py  && sudo python2.7 get-pip.py
```

> Output like pip: No such file or directory means it's not <br>
> Output like pip 1.5.6 from /Library/Python/2.7/site-packages (python 2.7) means you're all set

Run `pip --version` again to verify that it's working


### Get the AWS CLI tools installed
Run `aws --version` to see if it's installed

> Output like aws: No such file or directory means it's not <br>
> Output like aws-cli/1.9.9 Python/2.7.6 Darwin/14.3.0 botocore/1.3.9 means you're all set

To install it:  
```bash
sudo -H pip install awscli --upgrade --ignore-installed six
```

Run `aws --version` again to verify that it's working

### Get your personal AWS Access Key and AWS Secret Key from DevOps
#### Configure AWS CLI
Run `aws configure` to set up the CLI.   When prompted, enter your **Access Key**, **Secret Key**, `us-east-1` for the Default Region.  Other defaults are fine.

Review Configuration
```bash
> cat ~/.aws/config

[default]
region = us-east-1
```

```bash
> cat ~/.aws/credentials

[default]
aws_access_key_id = <ACCESS_KEY>
aws_secret_access_key = <SECRET_ACCESS_KEY>
```

---

AWS Bash helper functions

### aws-default | ex: aws-default profilename
The aws-default function is used to easily swap between multiple AWS profiles. This command will not be relevant for everyone, but if you have multiple AWS Profiles this should make your life slightly easier.

This will change your default aws profile to use the access key/secret key defined for the user named "profilename"

```bash
function aws-default {
        export AWS_DEFAULT_PROFILE=$1
}
```

### ssh-aws | ex: ssh-aws some-aws-instance
The ssh-aws function is used to ssh to whichever aws hostname you need to connect to. One thing to note is that this function specifies where the public key is located on your local filesystem, you will need to modify the function to reflect that key path (~/.ssh/aws_id_rsa).  

```bash
function ssh-aws {
    ssh -i ~/.ssh/aws_id_rsa admin@`aws-ip $1`
}
```

### aws-ip | ex: aws-ip some-aws-instance
The aws-ip function is used to find the IP to a specific AWS hostname. Without this command, the ssh-aws command will cease to work and you will need to manually type all the required information to SSH to an AWS instance.

```bash
function aws-ip {
  aws ec2 describe-instances --output text --max-items 1 --filters "Name=tag:Name,Values=$1*" "Name=instance-state-name,Values=running" --query 'Reservations[*].Instances[*].PrivateIpAddress'
}
```

### aws-ip-all | ex: aws-ip-all some-aws-instance
The aws-ip-all function is used to find the IP of any AWS hostname and have multiple results returned. This differs from the original aws-ip function in that it does not need to be specific and supports wildcard searches. If a user wanted to see every instance that belonged to a specific environment they could.

```bash
function aws-ip-all {
   aws ec2 describe-instances --filters "Name=tag:Name,Values=$1*" "Name=instance-state-name,Values=running" --query 'Reservations[*].Instances[*].[PrivateIpAddress,Tags[?Key==`Name`].Value[]]' --output text
}
```

--- 

## AWS s3api

### get-bucket-policy
```bash
aws s3api get-bucket-policy --bucket <BUCKET_NAME>
```

### put-bucket-policy
```bash
aws s3api put-bucket-policy --bucket <BUCKET_NAME> --policy file://~/Desktop/policy.json
```

### get list of file in bucket via `li` command
```bash
aws s3 ls s3://<BUCKET_NAME>
```