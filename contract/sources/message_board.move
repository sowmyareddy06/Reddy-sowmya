module "MessageBoard"::forever_message {
    use std::signer;
    use std::vector;
    use std::string;
    use std::timestamp;

    struct Message has copy, drop, store {
        sender: address,
        content: string::String,
        unlock_time: u64,
        sent_time: u64,
        delivered: bool,
    }

    struct MessageStore has key {
        messages: vector<Message>,
    }

    public entry fun send_message(
        sender: &signer,
        recipient: address,
        content: string::String,
        unlock_time: u64
    ) {
        let sender_addr = signer::address_of(sender);

        let now = timestamp::now_seconds();

        assert!(unlock_time > now, 1); // future time only

        let msg = Message {
            sender: sender_addr,
            content,
            unlock_time,
            sent_time: now,
            delivered: false,
        };

        if (!exists<MessageStore>(recipient)) {
            move_to(&recipient, MessageStore { messages: vector::empty<Message>() });
        };

        let store = borrow_global_mut<MessageStore>(recipient);
        vector::push_back(&mut store.messages, msg);
    }

    public fun get_messages(user: &address): vector<Message> {
        if (!exists<MessageStore>(*user)) {
            return vector::empty<Message>();
        }

        let now = timestamp::now_seconds();
        let store = borrow_global<MessageStore>(*user);
        let mut result = vector::empty<Message>();
        let msgs = &store.messages;

        let len = vector::length(msgs);
        let mut i = 0;
        while (i < len) {
            let msg = vector::borrow(msgs, i);
            if (!msg.delivered && (now >= msg.unlock_time || now >= msg.sent_time + 2 * 365 * 24 * 60 * 60)) {
                vector::push_back(&mut result, *msg);
            };
            i = i + 1;
        };

        result
    }
}
