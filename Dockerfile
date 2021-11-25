FROM rust:buster
RUN groupadd -g 999 user && useradd -m -d /user/ -r -u 999 -g user user
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt update
RUN apt install nodejs yarn jq sudo -y
RUN usermod -aG sudo user
USER user
RUN mkdir -p /user/.local/share/solana
RUN sh -c "$(curl -sSfL https://release.solana.com/stable/install)"
ENV PATH="/user/.local/share/solana/install/active_release/bin/:$PATH"
RUN solana-install update
RUN git clone https://github.com/metaplex-foundation/metaplex.git /user/metaplex-foundation/metaplex

RUN cd /user/metaplex-foundation/metaplex/js/packages/cli && yarn install
RUN cd /user/metaplex-foundation/metaplex/js/packages/cli && yarn build
RUN cd /user/metaplex-foundation/metaplex/js/packages/cli && sed -i.backup -e 's/--no-bytecode//' package.json 
RUN cd /user/metaplex-foundation/metaplex/js/packages/cli && yarn run package:linux
ENV PATH="/user/metaplex-foundation/metaplex/js/packages/cli/bin/linux/:$PATH"
RUN solana config set --url https://api.devnet.solana.com
