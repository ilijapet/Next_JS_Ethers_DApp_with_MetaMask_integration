#!usr/bin/python3s
from brownie import config, accounts, SimpleContract


def main():
    dev = accounts.add(config["wallets"]["from_key"])
    SimpleContract.deploy({"from": dev})

